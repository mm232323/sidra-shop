'use client'
import { SubmitOrder } from '@/util/user-apis';
import { Modal, NumberFormatter } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { redirect } from 'next/navigation';
import React from 'react'

const PaymentInfoActions:React.FC<{prodsSum:number,phone:string}> = ({prodsSum,phone}) => {
    const [opened, { open, close }] = useDisclosure(false);
  const handleSubmit = () => {
    SubmitOrder(phone)
    close()
    redirect('/dashboard')
  }
  return <>
  <Modal opened={opened} onClose={close} dir='rtl' centered>
    <h1 className='text-red-700 font-bold text-[30px]'>تنبيه هام!</h1>
    <p>لا يمكنك التراجع في عمليه الشراء, لذا هل انت متأكد من رغبتك في الشراء؟</p>
    <div className='flex gap-[20px] mt-[20px]'>
        <button className='border-none w-[400px] h-[50px] rounded-[15px] text-[30px] bg-red-100 cursor-pointer hover:bg-red-200 duration-300' onClick={close}>اريد التراجع</button>
        <button className='border-none w-[400px] h-[50px] rounded-[15px] text-[30px] bg-green-100 cursor-pointer hover:bg-green-200 duration-300' onClick={handleSubmit}>نعم متأكد</button>
    </div>
  </Modal>
  <div className="w-[29.5218295218%] h-[725px] bg-black/10 border-1 border-[#2311044f] flex flex-col gap-[20px] rounded-[36px] items-center justify-center py-[30px] max-[1000px]:w-full">
          <h1 className="text-[36px] text-[#231104] font-bold mb-[15px]">
            الدفع
          </h1>
          <div
            className="w-9/12 h-[104px] bg-[#45230A] text-white flex p-[15px] items-center justify-between border-1 rounded-[15px] text-[18px] product-shadow"
            dir="rtl"
          >
            <h1>سعر المنتجات</h1>
            <h1>
              <NumberFormatter prefix={" ج.م "} value={prodsSum} />
            </h1>
          </div>
          <div
            className="w-9/12 h-[104px] bg-[#45230A] text-white flex p-[15px] items-center justify-between border-1 rounded-[15px] text-[18px] product-shadow"
            dir="rtl"
          >
            <h1>سعر التوصيل</h1>
            <h1>
              <NumberFormatter prefix={" ج.م "} value={60} />
            </h1>
          </div>
          <div
            className="w-9/12 h-[104px] bg-[#45230A] text-white flex p-[15px] items-center justify-between border-1 rounded-[15px] text-[18px] product-shadow"
            dir="rtl"
          >
            <h1>السعر الإجمالي</h1>
            <h1>
              <NumberFormatter prefix={" ج.م "} value={prodsSum + 60} />
            </h1>
          </div>
          { prodsSum > 0 &&
          <button className="border-none w-9/12 h-[85px] bg-amber-500 text-stone-900 rounded-[15px] text-[30px] product-shadow cursor-pointer hover:bg-[#45230A] hover:text-white duration-300" onClick={open}>
            طلب الان
          </button>
          }
        </div>
  </>
}

export default PaymentInfoActions
