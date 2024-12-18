<script setup>
import StockChart from '@/components/charts/StockChart.vue';

</script>

<script>
  export default {
    data() {
      return {
        index: {
          label: 'UX34',
          name: 'UAX-34',
          value: 100.32,
          variation: 0.102,
          marketCap: 1000000
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
            marketCap: 1200000,
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
        <div class="stock_company">
          <div class="company_logo">{{index.label}}</div>
          <div class="stock_company_details">
            <div>{{index.name}}</div>
            <div>{{index.value.toLocaleString()}}€</div>
            <div>{{index.marketCap.toLocaleString()}}€</div>
            <div :style="getPositiveStyle(index.variation)">{{index.variation * 100}}%</div>
            
          </div>
        </div>
        <h2>Empresas</h2>
        <div class="stock_companies">
          <div v-for="company in companies" class="stock_company">
            <div :style="company.color ? 'background-color: ' + company.color + ';' : ''" class="company_logo">{{company.label}}</div>
            <div class="stock_company_details">
              <div>{{company.name}}</div>
              <div>{{company.value.toLocaleString()}}€</div>
              <div>{{company.marketCap.toLocaleString()}}€</div>
              <div :style="getPositiveStyle(company.variation)">{{company.variation * 100}}%</div>
              
            </div>
          </div>
        </div>

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
  gap: 1rem;
  width: 100%;
  grid-template-columns: 1fr 2fr;
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

.stock_company_details>div:nth-child(2n) {
  text-align: right;
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
</style>
