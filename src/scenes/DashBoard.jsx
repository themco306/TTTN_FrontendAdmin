import React from 'react'
import ContentHeader from '../components/ContentHeader'
import MyMap from '../components/MyMap'

function DashBoard() {
  return (
    <>
    <ContentHeader currentPage={'Trang chủ'} previousPage={''}/>
    <section className="content">
    <MyMap/>
    </section>
</>
  )
}

export default DashBoard
