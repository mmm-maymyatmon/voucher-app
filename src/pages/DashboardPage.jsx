import React from 'react'
import ModuleBtn from '../components/ModuleBtn';
import { Container } from '../components/Container';
import { HiCircleStack } from "react-icons/hi2";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { HiComputerDesktop } from "react-icons/hi2";
const DashboardPage = () => {
  return (
    <section>
        
        <Container>
            <div className='grid gird-cols-1 md:grid-cols-3 grid-rows-3 gap-5'>
                <div className='col-span-1 row-span-1'>
                    <ModuleBtn name={"Product Module"} icon={ <HiCircleStack className='size-14' /> } url={"/dashboard/product"} />
                </div>
                <div className='col-span-1 row-span-1'>
                    <ModuleBtn name={"Sale Module"} icon={ <HiComputerDesktop className='size-14' /> } url={"/dashboard/sale"} />
                </div>
                <div className='col-span-1 row-span-1'>
                    <ModuleBtn name={"Voucher Module"} icon={<HiDocumentDuplicate className='size-14' />} url={"/dashboard/voucher"} />
                </div>
            </div>
        </Container>
    </section>
  )
}

export default DashboardPage