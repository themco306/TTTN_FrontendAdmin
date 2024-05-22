import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useCustomException from '../../helpers/useCustomException';
import topicApi from '../../api/topicApi';
import { topicActions } from '../../state/actions/topicActions';
import { confirmPopup } from 'primereact/confirmpopup';
import { toast } from 'react-toastify';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { PrimeIcons } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import ModalTopicAdd from './ModalTopicAdd';
import ModalTopicEdit from './ModalTopicEdit';
import ModalTopicShow from './ModalTopicShow';

function TopicList() {
    const topicData = useSelector(
        (state) => state.topicReducers.topics
      );
      const dispatch = useDispatch();
      const handleException = useCustomException();
      const [selectedTopics, setSelectedTopics] = useState([]);
      const [sizeOptions] = useState([
        { label: "Nhỏ", value: "small" },
        { label: "Vừa", value: "normal" },
        { label: "Lớn", value: "large" },
      ]);
      const [size, setSize] = useState(sizeOptions[1].value);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await topicApi.getAll();
            console.log(response.data);
            dispatch(topicActions.listTopic(response.data));
          } catch (error) {
            if(error.response?.status){
              handleException(error)
    
            }
          }
        };
        fetchData();
      }, []);
      
    
      const handleDelete = async (categoryId) => {
        if (!confirmPopup()) return;
        try {
          let res = await topicApi.delete(categoryId);
          if (res.status === 200) {
            dispatch(topicActions.deleteTopic(categoryId));
            toast.success(res.data.message)
          }
          return;
        } catch (error) {
          if(error.response?.status){
            handleException(error)
    
          }
        }
      };
    
      const handleConfirmDelete = (categoryId) => {
        confirmDialog({
          message: "Bạn có thực sự muốn xóa?",
          header: "Xóa",
          acceptLabel: "Có",
          rejectLabel: "Không",
          icon: "pi pi-info-circle",
          position: "right",
          accept: () => handleDelete(categoryId),
          reject: () => {},
        });
      };
      const handleDeleteSelected = async () => {
        if (!confirmPopup()) return;
        try {
            const ids = selectedTopics.map(category => category.id);
            const data = {
                ids: ids
            };
            console.log(data);
            let res = await topicApi.deleteTopics(data);
            console.log(res);
            if (res.status === 200) {
                const updatedSelectedCategories = selectedTopics.filter(category => !ids.includes(category.id));
                setSelectedTopics(updatedSelectedCategories);
                dispatch(topicActions.deleteTopics(ids));
                toast.success(res.data.message)
            }
            return;
        } catch (error) {
          if(error.response?.status){
            handleException(error)
    
          }
        }
    };
    
      const handleConfirmDeleteSelected = () => {
        if (selectedTopics.length > 0) {
          confirmDialog({
            message: "Bạn có thực sự muốn xóa?",
            header: "Xóa",
            acceptLabel: "Có",
            rejectLabel: "Không",
            icon: "pi pi-info-circle",
            position: "top-left",
            accept: handleDeleteSelected,
            reject: () => {},
          });
        } else {
          toast.info("Bạn chưa chọn gì để xóa!")
        }
      };
      const handleChangeStatus= async (id)=>{
        try{
          const response=await topicApi.updateStatus(id);
          if(response.status===200){
              dispatch(topicActions.updateStatusTopic(id));
          }
          console.log(response)
        }catch(error){
          if(error.response?.status){
            handleException(error)
    
          }
        }
       
      }
  return (
    <>
    <ConfirmDialog />
    <ContentHeader currentPage={"Chủ đề"} previousPage={"Trang chủ"} />
    <ContentMain>
      <div className="card">
        <div className="row  flex justify-content-between  mb-4">
          <div className="col-md-6">
            <Button
              icon={PrimeIcons.TRASH}
              label="Xóa đã chọn"
              onClick={handleConfirmDeleteSelected}
              severity="danger"
              raised
              disabled={selectedTopics.length === 0}
            />
            
            <ModalTopicAdd />
          </div>
          <div
            className="col-md-6 "
            style={{ display: "flex", justifyContent: "end" }}
          >
            <SelectButton
              value={size}
              onChange={(e) => setSize(e.value)}
              options={sizeOptions}
            />
          </div>
        </div>

        <DataTable
          value={topicData}
          size={size}
          selectionMode={false ? null : "checkbox"}
          selection={selectedTopics}
          onSelectionChange={(e) => setSelectedTopics(e.value)}
          dataKey="id"
          paginator
          removableSort 
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "5%" }}
          ></Column>
          <Column  headerStyle={{ width: "5%" }} sortable  field="id" header="Mã"></Column>
          <Column  headerStyle={{ width: "25%" }} sortable  field="name" header="Tên"></Column>
          <Column
            header="Chức năng"
            headerStyle={{ width: "30%" }}
            body={(rowData) => (
              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                key={rowData.id}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <InputSwitch
                    checked={rowData.status===1?true:false}
                    onChange={()=>handleChangeStatus(rowData.id)}
                  />
                </div>
                <ModalTopicShow topicId={rowData.id}/>
                <ModalTopicEdit topicId={rowData.id}/>

                <Button
                  icon={PrimeIcons.TRASH}
                  label="Xóa"
                  severity="danger"
                  onClick={() => handleConfirmDelete(rowData.id)}
                  raised
                  rounded
                />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
    </ContentMain>
  </>
  )
}

export default TopicList
