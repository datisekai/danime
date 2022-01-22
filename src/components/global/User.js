import create from 'zustand'

export const useLoginStore = create(set => ({
    user:undefined,
    setUser: (userLogin) => set({
        user:userLogin
    }),
}))