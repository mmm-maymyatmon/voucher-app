import React from 'react'
import Container from '../components/Container'
import Breadcrumb from '../components/Breadcrumb'
import ProductEditCard from '../components/ProductEditCard'
import VoucherCard from '../components/VoucherCard'

const VoucherDetailPage = () => {
  return (
    <section>
        <Container>
            <Breadcrumb currentPageTitle={"Voucher Detail"} links={[{ title: "Voucher Module", path: "/voucher" }]}  />
            <VoucherCard/>
        </Container>
    </section>
  )
}

export default VoucherDetailPage