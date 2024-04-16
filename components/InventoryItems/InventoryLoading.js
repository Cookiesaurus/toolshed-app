import React from 'react'
import Image from 'next/image'
import LoadingImage from '../../app/public/images/loading.gif'
const InventoryLoading = () => {
  return (
    <>
      <h1>Loading</h1>
      <Image src={LoadingImage} alt='Loading Animation' width={200} height={200}/>
    </>
  )
}

export default InventoryLoading
