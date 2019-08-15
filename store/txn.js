export const actions = {
  async transfer({ commit }, params) {
    try {
      await this.$axios.post(`/wallets/${params.source_wallet_id}/transfer`, {
        wallet_transaction: {
          amount: params.amount,
          target_wallet_id: params.target_wallet_id,
          pin: params.pin
        }
      })
      return { hasError: false }
    } catch (err) {
      return { hasError: true, errors: err.response.data }
    }
  }
}
