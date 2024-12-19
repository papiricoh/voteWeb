<script setup>
import PieChart from '@/components/charts/PieChart.vue';
import StockChart from '@/components/charts/StockChart.vue';

</script>

<script>
  export default {
    data() {
      return {
        wallet: {
          avariable: 1200,
          value: 1232000,
        },
        index: {
          label: 'UX34',
          name: 'UAX-34',
          value: 100.32,
          variation: 0.102,
          marketCap: 10232303214000
        },
        companies: [
          {
            label: 'APPL',
            name: 'Apple',
            value: 100.32,
            marketCap: 1000000,
            variation: 0.102,
            color: 'black'
          },
          {
            label: 'NVDA',
            name: 'Nvidia',
            value: 130.32,
            marketCap: 1202000,
            variation: -0.102,
          }
        ]
      };
    },
    methods: {
      getPositiveStyle(value) {
        if(value > 0) {
          return "color: green";
        }else {
          return "color: red";
        }
      },
      formatCurrency(value) {
        if (typeof value !== 'number') {
          return value;
        }else if(value >= 1000000000000) {
          return (value / 1000000000000).toFixed(2).toLocaleString() + ' T';
        }else if(value >= 1000000000) {
          return (value / 1000000000).toFixed(2).toLocaleString() + ' B';
        }else if(value >= 1000000) {
          return (value / 1000000).toFixed(2).toLocaleString() + ' M';
        }else if(value >= 1000) {
          return (value / 1000).toFixed(2).toLocaleString() + ' k';
        }
        return value.toFixed(2).toLocaleString();
      }
    },
    computed: {

    },
  };
</script>

<template>
  <main>
    <h1 style="align-self: flex-start;">Bolsa</h1>
    <!-- <StockChart /> -->
    <div class="stock_container">
      <div class="stock_companies_container">
        <h2>Indices</h2>
        <div @click="$router.push('/stock/index/' + index.label)" class="stock_company">
          <div class="company_logo">{{index.label}}</div>
          <div class="stock_company_details">
            <div>{{index.name}}</div>
            <div>{{index.value.toLocaleString()}}<div class="currency">EUR</div></div>
            <div>{{formatCurrency(index.marketCap)}}<div class="currency">EUR</div></div>
            <div :style="getPositiveStyle(index.variation)">{{index.variation * 100}}%</div>
            
          </div>
        </div>
        <h2>Empresas</h2>
        <div class="stock_companies">
          <div @click="$router.push('/stock/' + company.label)" v-for="company in companies" class="stock_company">
            <div :style="company.color ? 'background-color: ' + company.color + ';' : ''" class="company_logo">{{company.label}}</div>
            <div class="stock_company_details">
              <div>{{company.name}}</div>
              <div>{{company.value.toLocaleString()}}<div class="currency">EUR</div></div>
              <div>{{formatCurrency(company.marketCap)}}<div class="currency">EUR</div></div>
              <div :style="getPositiveStyle(company.variation)">{{company.variation * 100}}%</div>
              
            </div>
          </div>
        </div>

      </div>
      <div class="wallet_container">
        <h2>Wallet</h2>
        <div class="global_pos_container">
          <div class="pos_title">Disponible:</div>
          <div class="wallet_value">{{wallet.avariable.toLocaleString()}} EUR</div>
          <div class="pos_title">Valor total:</div>
          <div class="wallet_value">{{wallet.value.toLocaleString()}} EUR</div>
        </div>
        <h4>Resumen</h4>
        <PieChart />
      </div>
     </div>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-left: 16vw;
}

.stock_container {
  display: grid;
  gap: 14rem;
  width: 100%;
  grid-template-columns: 30vw 2fr;
}
.stock_companies_container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stock_companies {
  display: flex;
  flex-direction: column;
  gap: 1rem;

}
.stock_company {
  display: grid;
  grid-template-columns: 1fr 8fr;
  gap: 1rem;
  padding: 1rem;

  cursor: pointer;
  align-items: center;
  border-radius: .4rem;
  transition: .2s;
}
.stock_company>div:first-child {
  font-weight: bold;
  font-size: 1.15rem;
  
}
.stock_company:hover {
  background-color: var(--focused-air);
}
.stock_company:active {
  background-color: var(--active-air);
}
.stock_company_details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: .5rem;
  font-weight: bold;

}

.stock_company_details>div:first-child {
  font-weight: bold;
  font-size: 1.1rem;
}

.stock_company_details>div {
  display: flex;
  text-align: right;
  align-items: end;
  gap: .2rem;
}
.currency_container {
  display: flex;
  text-align: right;
  align-items: end;
  gap: .2rem;
}

.stock_company_details>div:nth-child(2n) {
  align-self: end;
  justify-self: end;
  display: flex;
  text-align: right;
  align-items: end;
  gap: .2rem;
}
.company_logo {
  background-color: var(--cerulean);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  aspect-ratio: 1;
  border-radius: .4rem;
}
.currency {
  font-size: .8rem;
  font-weight: normal;

}
.currency_wallet {
  font-size: 1rem;

}
.wallet_container {
  justify-self: end;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--picton-blue);
  color: white;
  border-radius: .4rem;
  width: 100%;
  box-sizing: border-box;
}

.wallet_value {
  font-size: 2rem;
  font-weight: bold;
  text-align: right;

  display: flex;
  text-align: right;
  align-items: end;
  gap: .2rem;
  align-self: center;
}

.global_pos_container {
  display: grid;
  grid-template-columns: 1fr 3.5fr;
  gap: 1rem;
  align-items: center;
}
.global_pos_container>div:nth-child(2n) {
  justify-self: end;
}

.pos_title {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
