<template>
  <div v-if="dataOrderNote.order_note_list.length">
    <div v-if="!isMobile">
      <pending-verifications-web
        :verifications-data="dataOrderNote"
      />
    </div>
    <div v-if="isMobile">
      <appointment-notes
        :appointment-notes-data="dataOrderNote"
      />
    </div>
  </div>
</template>

<script>
import { getErrors } from '../../utils/utils';
import { mapGetters } from 'vuex';

export default {
  components: {
    pendingVerificationsWeb: () => import('../Core/components/pending-verifications-web/PendingVerificationsWeb.vue'),
    appointmentNotes: () => import('../Core/components/appointment-notes-mobile/AppointmentNotes.vue'),
  },
  data() {
    return {
      state: {
        view: 'verifications',
      },
      dataOrderNote: {
        columns: ['ordemServico_idOrdemServico', 'Solicitante', 'Reporte', 'Manutentor', 'actions'],
        columnsMobile: ['ordemServico_idOrdemServico'],
        options: {
          headings: {
            ordemServico_idOrdemServico: create => create('span', {
              domProps: { innerHTML: 'Ordem <i class="fas fa-sort"></i>' },
            }),
            Solicitante: 'Solicitante',
            Reporte: 'Reporte',
            Manutentor: 'Manutentor',
            actions: 'Ações',
          },
          texts: {
            filter: '',
            filterPlaceholder: 'Buscar',
            count: 'Mostrando {from} até {to} de {count} registros|{count} Registros|Um Registro',
            limit: '',
            page: 'Páginas:',
            noResults: 'Nenhum registro encontrado',
            loading: 'Carregando...',
          },
          perPage: 10,
          perPageValues: [],
          sortable: ['ordemServico_idOrdemServico'],
        },
        order_note_list: [],
      },
    };
  },

  computed: {
    ...mapGetters({
      isMobile: 'getIsMobile',
    }),
  },

  mounted() {
    this.listOrderNote();
    this.setActivity();
    this.$store.commit('addPageName', 'Verificações');
  },

  methods: {
    setActivity() {
      this.$http.setActivity(this.$activities.VERIFICATION_CONSULT_OPEN);
    },
    async listOrderNote(user) {
      try {
        const orders = await this.$http.microserviceAnalisis('analysis/order-note', {
          headers: { user },
        });
        console.log('orders:', orders);
        console.log('note: ', this.order_note_list);
        console.log('orders: ', orders.length);
        if (orders.length !== undefined)
          this.dataOrderNote.order_note_list = [...orders];
        else this.dataOrderNote.order_note_list.push(orders);
        this.mobileOptions();
      } catch (err) {
        console.log('err :>> ', err.response || err);
        return this.$swal({
          type: 'warning',
          html: getErrors(err),
          confirmButtonColor: '#F34336',
        });
      }
    },
    mobileOptions() {
      if (this.isMobile) {
        this.dataOrderNote.options.headings = {
          ordemServico_idOrdemServico: create => create('span', {
            domProps: { innerHTML: 'Ordem <i class="fas fa-sort"></i>' },
          }),
        };
      }
    },
  },
};
</script>

<style lang="scss">
</style>
