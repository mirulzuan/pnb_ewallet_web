<template>
  <section class="section">
    <div class="columns">
      <div class="column is-full">
        <h1 class="has-text-weight-medium is-size-5">Wallets</h1>
      </div>
    </div>

    <div class="columns">
      <div class="column is-full">
        <div v-for="wallet in currentUser.wallets" :key="wallet.id">
          <b-collapse class="card is-block" aria-id="contentIdForA11y3">
            <div
              slot="trigger"
              slot-scope="props"
              class="card-header"
              role="button"
              aria-controls="contentIdForA11y3"
            >
              <p class="card-header-title">Wallet {{ wallet.id }}</p>
              <p class="card-header-icon">
                <a>RM{{ wallet.credit }}</a>
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
              </a>
            </div>
            <div class="card-content">
              <div class="content">
                <table v-if="wallet.transactions.length > 0" class="table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Transaction Details</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="txn in wallet.transactions" :key="txn.id">
                      <th>
                        {{ txn.date }} <br />
                        <small>{{ txn.time }}</small>
                      </th>
                      <td>
                        {{
                          txn.type == 'Debit'
                            ? `Transferred to Wallet ${txn.target_wallet_id}`
                            : `Transferred from Wallet ${txn.source_wallet_id}`
                        }}
                      </td>
                      <td>
                        {{ txn.type == 'Debit' ? '- ' : '+ ' }}
                        RM{{ txn.amount }}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div v-else class="notification is-danger">
                  No transactions found.
                </div>
              </div>
            </div>
          </b-collapse>
          <br />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['check-auth', 'auth'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser'
    })
  },
  fetch({ store, params }) {
    return store.dispatch('auth/setCurrentUser')
  },
  methods: {}
}
</script>
