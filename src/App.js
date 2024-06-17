
import { useEffect } from 'react';
import webInfoApi from './api/webInfoApi';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import SignalRComponent from './signal/SignalRComponent';
import { useDispatch } from 'react-redux';
import { webInfoActions } from './state/actions/webInfoActions';

function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await webInfoApi.getFirst();
        if (res.status === 200) {
          console.log(res);
          // setWebInfo(res.data);
          dispatch(webInfoActions.listInfo(res.data))
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
  <Header/>
  <Sidebar/>
  <Main/>
  </>
  );
}

export default App;
