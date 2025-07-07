'use client'

import { ProductEditModal } from './ProductEditModal'
import { ProductPrisma } from '@/type'

const defaultNewItem: Partial<ProductPrisma> = {
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
    desc_en: '',
    desc_zh: '',
}

export const ProductAdd = () => {
    const handleAdd = async (item: Partial<ProductPrisma>) => {
        const res = await fetch('/api/product/edit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: item }),
        })

        if (res.ok) {
            alert('商品新增成功')
            location.href = `${location.protocol}//${location.host}${location.pathname}?tab=product`
        }
    }

    return <ProductEditModal buttonText={'添加商品'} onSave={handleAdd} defaultItem={defaultNewItem} />
}
