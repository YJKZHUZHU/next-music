import { create } from "zustand"

interface Props {
  cookie: string
}

interface Actions {
  setCookie: (cookie: string) => void
}

const useStore = create<Props & Actions>((set) => ({
  cookie: "",
  setCookie: (cookie) => set({ cookie }),

}))
