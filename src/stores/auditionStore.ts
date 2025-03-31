import { defineStore } from 'pinia'

export const useAuditionStore = defineStore('audition', {
  state: () => ({
    auditions: [] as Array<any>,
    loading: false,
  }),

  actions: {
    async fetchAuditions() {
      this.loading = true
      try {
        const res = await fetch('http://localhost:4000/api/auditions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await res.json()
        this.auditions = data
      } catch (err) {
        console.error('Failed to fetch auditions:', err)
      } finally {
        this.loading = false
      }
    },

    async addAudition(audition: any) {
      const res = await fetch('http://localhost:4000/api/auditions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(audition),
      })

      const newAudition = await res.json()
      this.auditions.unshift(newAudition)
    },

    async deleteAudition(id: number) {
      await fetch(`http://localhost:4000/api/auditions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      this.auditions = this.auditions.filter(a => a.id !== id)
    },
  },
})
