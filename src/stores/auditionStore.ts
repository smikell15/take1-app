import { defineStore } from 'pinia'

export const useAuditionStore = defineStore('audition', {
  state: () => ({
    auditions: [] as Array<{ id: number; show: string; role: string }>,
  }),
  actions: {
    addAudition(show: string, role: string) {
      const id = Date.now()
      this.auditions.push({ id, show, role })
    },
    deleteAudition() {
        this.auditions.pop();
      },
  },
})