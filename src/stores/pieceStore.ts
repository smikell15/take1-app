import { defineStore } from 'pinia'

export const usePieceStore = defineStore('piece', {
  state: () => ({
    pieces: [] as Array<any>,
    loading: false,
  }),
  actions: {
    async fetchPieces() {
      this.loading = true
      const res = await fetch('http://localhost:4000/api/pieces', {
        headers: {
          //Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      this.pieces = await res.json()
      this.loading = false
    },
    async addPiece(piece: any) {
      const res = await fetch('http://localhost:4000/api/pieces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(piece),
      })
      const newPiece = await res.json()
      this.pieces.unshift(newPiece)
    },
    async deletePiece(id: number) {
      await fetch(`http://localhost:4000/api/pieces/${id}`, {
        method: 'DELETE',
        headers: {
          //Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      this.pieces = this.pieces.filter(p => p.id !== id)
    },
    async markAsUsed(id: number) {
      const res = await fetch(`http://localhost:4000/api/pieces/${id}/mark-used`, {
        method: 'PATCH',
        headers: {
          //Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const updated = await res.json()
      const index = this.pieces.findIndex(p => p.id === id)
      if (index !== -1) this.pieces[index] = updated
    }
  },
})