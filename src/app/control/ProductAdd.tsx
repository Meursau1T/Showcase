'use client'

import { useState } from 'react';
import { ProductEditModal } from "./ProductEditModal"
import { ProductPrisma } from '@/type';

const defaultNewItem = {
  name: '',
  type: '',
  hlw: '',
  manufacturer: [],
  oem_no: [],
  ref_no: [],
  machine_model: [],
  cu_m3: '',
  desc_app: '',
  price: '',
}

export const ProductAdd = () => {
  const [newItem, setNewItem] = useState<Partial<ProductPrisma>>(defaultNewItem)

  const handleAdd = async () => {
    const res = await fetch('/api/product/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })

    if (res.ok) {
      alert('商品新增成功')
    }
  }

  return (
    <ProductEditModal
      buttonText={'添加商品'}
    />
  )
}
