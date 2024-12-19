<template>
    <div class="chart-wrapper">

        <div ref="chartContainer" class="chart" />
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
name: 'PieChartComponent',
data() {
    return {
    chartInstance: null,
    chartOptions: {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
            },
        },
        series: [
        {
            name: 'Acciones de ',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderWidth: 2,
            },
            label: {
            show: false,
            position: 'center',
            },
            emphasis: {
                itemStyle: {
                    borderWidth: 0, // Sin borde en emphasis
                },
                label: {
                    show: true,
                    fontWeight: 'bold',
                    color: '#fff',
                },
            },
            labelLine: {
                show: false,
            },
            data: [
                { value: 1048, name: 'APPL' },
                { value: 735, name: 'GOOG' },
                { value: 580, name: 'NVDA' },
            ],
        },
        ],
    },
    };
},
mounted() {
    // Inicializa el gráfico
    const container = this.$refs.chartContainer;
    if (container) {
    this.chartInstance = echarts.init(container);
    this.chartInstance.setOption(this.chartOptions);

    // Hacer responsive
    window.addEventListener('resize', this.handleResize);
    }
},
beforeUnmount() {
    // Desmonta la instancia y elimina el listener de resize
    if (this.chartInstance) {
    this.chartInstance.dispose();
    }
    window.removeEventListener('resize', this.handleResize);
},
methods: {
    handleResize() {
    if (this.chartInstance) {
        this.chartInstance.resize();
    }
    },
},
};
</script>

<style scoped>
.chart-wrapper {
    width: 100%;
    height: 400px;
}

.chart {
    width: 100%;
    height: 100%;
}
</style>
  