import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import appUrl from '../api/appUrl';

const FileUpload = ({ onFilesUploaded, showEditData=[] }) => {
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [oldImages, setOldImage] = useState(showEditData);



  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const previews = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push({ file, preview: e.target.result });
        if (previews.length === selectedFiles.length) {
          setFilePreviews([...filePreviews, ...previews]);
          setFiles([...files, ...selectedFiles]);
          onFilesUploaded([...files, ...selectedFiles],oldImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    const newPreviews = [...filePreviews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setFiles(newFiles);
    setFilePreviews(newPreviews);
    onFilesUploaded(newFiles,oldImages)
  };

  const handleReorder = (index, direction) => {
    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newFiles.length) {
      const tempFile = newFiles[newIndex];
      const tempPreview = filePreviews[newIndex];
      newFiles[newIndex] = newFiles[index];
      newFiles[index] = tempFile;
      const newPreviews = [...filePreviews];
      newPreviews[newIndex] = filePreviews[index];
      newPreviews[index] = tempPreview;
      setFiles(newFiles);
      setFilePreviews(newPreviews);
      onFilesUploaded(newFiles,oldImages);
    }
  };
const handleRemoveOldImages =(id)=>{
  const updatedIds = oldImages.filter(image => image.id !== id);
  setOldImage(updatedIds);
  onFilesUploaded(files,updatedIds)
}
const handleRefreshOldImages=()=>{
  setOldImage(showEditData)
  onFilesUploaded(files,oldImages)

}
  return (
    <div>
      <div style={{ display:'flex',alignItems:'center' }}>
      <label htmlFor='images' style={{ fontSize: 20, fontWeight: 'bold', cursor: 'pointer', border: '2px solid orange', padding: '10px 20px' }}>Thêm ảnh</label>
      <input type="file" id='images' style={{ opacity:0,position:'absolute',zIndex:-1 }} onChange={handleFileChange} multiple  accept='' />
      <Button className='ml-2' icon='pi pi-refresh' onClick={handleRefreshOldImages} />
      <span className='ml-2'>{oldImages.length > 0 ? `${oldImages.length} ảnh cũ ` : ''}</span>
      <span className='ml-2'>{files.length > 0 ? `+ ${files.length} ảnh mới.` : ''}</span>
      </div>
      {oldImages.length>0&&oldImages.map((item, index) => (
        <div key={index} className='row mt-2' style={{ alignItems:"center", maxHeight:200}}>
          <div className='col-md-4 pl-5'>
          <img src={appUrl.imageURL+item.imagePath} alt={`Preview ${index}`} style={{height:120 }}/>
          </div>
          <div className='col-md-4'>
          <span style={{ fontSize:18,fontWeight:'bold' }}><strong>{item.imageName}</strong></span>
          </div>
          <div className='col-md-4' style={{ display:'flex',justifyContent:'space-around' }}>
          <Button
                icon={PrimeIcons.TRASH}
                label="Xóa"
                onClick={() => handleRemoveOldImages(item.id)}
                severity="danger"
                raised
              />
          </div>
          
          
         
        </div>
      ))}
      {filePreviews.map((item, index) => (
        <div key={index} className='row mt-2' style={{ alignItems:"center", maxHeight:200}}>
          <div className='col-md-4 pl-5'>
          <img src={item.preview} alt={`Preview ${index}`} style={{height:120 }}/>
          </div>
          <div className='col-md-4'>
          <span style={{ fontSize:18,fontWeight:'bold' }}><strong>{item.file.name}</strong></span>
          </div>
          <div className='col-md-4' style={{ display:'flex',justifyContent:'space-around' }}>
          <Button
                icon={PrimeIcons.TRASH}
                label="Xóa"
                onClick={() => handleRemoveFile(index)}
                severity="danger"
                raised
              />
              <Button
                icon={PrimeIcons.ARROW_UP}
                label="Lên"
                onClick={() => handleReorder(index, 'up')}
                severity="success"
                raised
                disabled={index === 0}
              />
               <Button
                icon={PrimeIcons.ARROW_DOWN}
                label="Xuống"
                onClick={() => handleReorder(index, 'down')}
                severity="success"
                raised
                disabled={index === files.length - 1}
              />
          </div>
          
          
         
        </div>
      ))}
    </div>
  );
};

export default FileUpload;
