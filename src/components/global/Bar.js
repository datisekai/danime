import create from 'zustand'

export const useSideBar = create(set => ({
    sidebar:false,
    setSidebar: (item) => set({sidebar:!item})
}))