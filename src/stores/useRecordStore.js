import { create } from "zustand";

const useRecordStore = create((set) => ({
    records: [],
    addRecord: (record) => set((state) => ({ records: [...state.records, record] })),
    removeRecord: (id) => set((state) => ({ records: state.records.filter((record) => record.id !== id) })),
    changeQuantity: (id, quantity) =>
        set((state) => ({
            records: state.records.map((record) => (record.product_id === id ? { 
                ...record, 
                quantity: parseInt(record.quantity) + parseInt(quantity),
                cost: record.cost + (record.product.price * quantity)
            } : record

            ))
        })),
    resetRecord: () => set({ records: [] }),
})); 

export default useRecordStore;