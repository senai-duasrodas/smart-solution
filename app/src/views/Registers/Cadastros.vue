<template>
  <div class="root-cadastro-view">
    <transition name="slide-fade" mode="out-in">
      <div v-if="$route.path === '/cadastros'">
        <back-button
          @goBack="goBack"
        />
        
        <div class="card-container d-flex justify-content-center align-items-center flex-column">
          <div class="card-title d-flex justify-content-center align-items-center">
            <span>Escolha o tipo de cadastro</span>
          </div>
          <div class="card-wrapper d-flex justify-content-center align-items-center flex-wrap">
            <div v-for="(card, index) in cards" :key="`card-${index}`">
              <card-option :title="card.title" :icon="card.icon" :route="card.route" />
            </div>
          </div>
        </div>
      </div>
      
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'Ordem de Manutenção',
          icon: 'fas fa-file-signature',
          route: 'cadastros/cadastro-ordem-manutencao',
        },
        {
          title: 'Equipamento',
          icon: 'fas fa-tools',
          route: 'cadastros/cadastro-equipamento',
        },
        {
          title: 'Local de instalção',
          icon: 'fas fa-map-marker-alt',
          route: 'cadastros/cadastro-local-instalacao',
        },
        {
          title: 'Centro de Trabalho',
          icon: 'fas fa-map-pin',
          route: 'cadastros/cadastro-centro-trabalho',
        },
        // {
        //   title: 'Tipo de Ordem',
        //   icon: 'fas fa-file',
        //   route: 'cadastros/cadastro-tipo-ordem',
        // },
        {
          title: 'Causa e sintoma',
          icon: 'fas fa-exclamation-triangle',
          route: 'cadastros/cadastro-causa-sintoma',
        },
        {
          title: 'EPI',
          icon: 'fas fa-hard-hat',
          route: 'cadastros/cadastro-epi',
        },
        {
          title: 'Componente',
          icon: 'fas fa-puzzle-piece',
          route: 'cadastros/cadastro-componente',
        },
        {
          title: 'Operações',
          icon: 'fas fa-cogs',
          route: 'cadastros/cadastro-operacao',
        },
      ],
    };
  },

  created() {
    if (window.innerWidth <= '1024') this.$router.replace('/dashboard');
    return;
  },

  mounted() {
    this.$store.commit('addPageName', 'Cadastros');
  },
  
  methods: {
    goBack() {
      this.$router.push('/dashboard');
    },
  },
};
</script>

<style lang="scss" scoped>
.root-cadastro-view {
  .card-container {
    .card-title{
      span {
        font-family: 'Nunito';
        font-size: 23px;
        color: #E66E6D;
      }
    }
    .card-wrapper {
      width: 90%;
    }

    @media screen and (max-width: 1660px) {
      .card-wrapper {
        width: 80%;
      }
    }

    @media screen and (max-width: 1090px) {
      .card-wrapper {
        width: 100%;
      }
    }
  }

  .slide-fade-enter-active {
    transition: all 0.2s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
