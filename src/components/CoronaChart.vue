<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { ref } from 'vue';

/* Description:
1. Variables
2. Chart
3. Functions
4. Axios requests

/* 1. Variables */

/*Chart variables */
let SwedenCasesData = [];
let SwedenDeathsData = [];
let ChinaCasesData = [];
let ChinaDeathsData = [];

/* SwedenCasesLabels are the labels used for all datasets */
let SwedenCasesLabels = [];
let SwedenCases;

let Datasets;
const ChartExists = ref(false);

/*Chart filter variables */
let BoxChecked;
const Checked = true;
let SearchDate;
let SearchByDate;

/*2. Chart */

onMounted(() => {
    const chart = new Chart(CoronaChart, {
        type: 'line',
        data: {
            labels: SwedenCasesLabels,
            datasets: [
                { label: 'Cases in Sweden', data: SwedenCasesData, borderColor: '#0592fa', hoverBackgroundColor: '#0592fa' },
                {
                    label: 'Deaths in Sweden', data: SwedenDeathsData, borderColor: '#4160be',
                    hoverBackgroundColor: '#4160be'
                },
                {
                    label: 'Cases in China', data: ChinaCasesData, borderColor: '#45bd42',
                    hoverBackgroundColor: '#45bd42'
                },
                {
                    label: 'Deaths in China', data: ChinaDeathsData, borderColor: '#486c1f',
                    hoverBackgroundColor: '#486c1f'
                },
            ]
        },

        /*Styling of chart */
        options: {
            borderWidth: 2,
            pointRadius: 50,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointHoverRadius: 5,
            hoverBorderColor: 'black',
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 0
                        }
                    }
                },
                x: {
                    ticks: {
                        maxTicksLimit: 15,
                        autoSkip: true,
                        font: {
                            size: 0
                        }
                    },
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 0
                        }
                    }
                },
                tooltip: {
                    bodyFont: {
                        size: 0
                    },
                    titleFont: {
                        size: 0
                    }
                }
            }
        }
    })

    /* 3. Functions */

    /* Function: resize chart text responsively */
    function adjustFontSize() {
        var fontSize = window.innerWidth <= 1024 ? 20 : 16;
        chart.options.scales.x.ticks.font.size = fontSize;
        chart.options.scales.y.ticks.font.size = fontSize;
        chart.options.plugins.legend.labels.font.size = fontSize;
        chart.options.plugins.tooltip.titleFont.size = fontSize;
        chart.options.plugins.tooltip.bodyFont.size = fontSize;
        chart.update();
    }

    window.addEventListener('resize', adjustFontSize);
    adjustFontSize();

    /* Function: Toggle dataset visibility */
    BoxChecked = ((a) => {
        chart.data.datasets[a].hidden = !chart.data.datasets[a].hidden;
        chart.update();
    })

    /* Function: search data By date */
    SearchByDate = (() => {
        let dateIndex;
        const searchDateData = [];

        if (chart.data.labels.length > 0) {
            const findIndexOfLabel = () => {
                dateIndex = chart.data.labels.findIndex((label) => label === SearchDate);
            }
            findIndexOfLabel();
        }
        chart.data.datasets.forEach((dataset, datasetIndex) => {
            searchDateData.push({ datasetIndex, index: dateIndex })
            /* push datapoint from dataset[i] at index: searchDateIndex */
        });

        if (dateIndex !== -1) {
            chart.tooltip.setActiveElements(searchDateData);
            chart.update();
        }

    })

    /*4. Axios requests */

    /*Swedish Cases Axios Request*/
    axios.get(
        'https://api.api-ninjas.com/v1/covid19?', {
        params: { country: 'sweden' },
        headers: { 'X-Api-Key': 'tKQVbZ0XoYz53H8VyBsGTg==PftSnkW7fWnOl2yn' }
    })
        .then(response => {
            SwedenCases = response.data[0].cases;

            for (const day in response.data[0].cases) {
                SwedenCasesData.push(response.data[0].cases[day].total);
            }

            /* SwedenCasesLabels are the labels used for all datasets */
            SwedenCasesLabels = Object.keys(SwedenCases);

            chart.data.labels = SwedenCasesLabels;
            chart.data.datasets[0].data = SwedenCasesData;
            chart.update();

        })
        .catch(error => {
            console.error(error);
        });

    /*Swedish Deaths Axios Request*/
    axios.get(
        'https://api.api-ninjas.com/v1/covid19?', {
        params: { country: 'sweden', type: 'deaths' },
        headers: { 'X-Api-Key': 'tKQVbZ0XoYz53H8VyBsGTg==PftSnkW7fWnOl2yn' }
    })
        .then(response => {
            for (const day in response.data[0].deaths) {
                SwedenDeathsData.push(response.data[0].deaths[day].total);
            }
            chart.data.datasets[1].data = SwedenDeathsData;
            chart.update();
        })
        .catch(error => {
            console.error(error);
        });

    /* Chinese Cases Axios Request */
    axios.get(
        'https://api.api-ninjas.com/v1/covid19?', {
        params: { country: 'china', type: 'cases' },
        headers: { 'X-Api-Key': 'tKQVbZ0XoYz53H8VyBsGTg==PftSnkW7fWnOl2yn' }
    })
        .then(response => {
            for (const region of response.data) {
                /* Data from all regions added toghether */
                let DayIndex = 0;
                for (const day in region.cases) {
                    DayIndex++
                    ChinaCasesData[DayIndex] = (ChinaCasesData[DayIndex] || 0) + region.cases[day].total;
                }
            }
            chart.data.datasets[2].data = ChinaCasesData;
            chart.update();
        })

    /* Chinese Deaths Axios Request */
    axios.get(
        'https://api.api-ninjas.com/v1/covid19?', {
        params: { country: 'china', type: 'deaths' },
        headers: { 'X-Api-Key': 'tKQVbZ0XoYz53H8VyBsGTg==PftSnkW7fWnOl2yn' }
    })
        .then(response => {
            for (const region of response.data) {
                /* Data from all regions added toghether */
                let DayIndex = 0;
                for (const day in region.deaths) {
                    DayIndex++
                    ChinaDeathsData[DayIndex] = (ChinaDeathsData[DayIndex] || 0) + region.deaths[day].total;
                }
            }
            chart.data.datasets[3].data = ChinaDeathsData;
            chart.update();
        })

    ChartExists.value = true;
    Datasets = chart.data.datasets;
});

</script>

<template>
    <div>
        <div id="Container">
            <div class="ChartWidth ChartHeight"><canvas id=CoronaChart></canvas></div>
            <div id="FilterContainer" class="SideMargin TopMargin">
                <router-link to="/about">About</router-link>
                <div class="TopMargin">
                    <label id="SearchLabel">
                        Search by Date: (yyyy-mm-dd)
                        <div>
                            <input type="text" v-model="SearchDate" @keyup.enter="SearchByDate">
                            <button @click="SearchByDate">search</button>
                        </div>
                    </label>
                </div>
                <div v-if="ChartExists">
                    <div class="TopMargin CheckboxFlexContainer" v-for="(dataset, index) in Datasets" :key="index">
                        <label :for="index">{{ dataset.label }} </label>
                        <input :id="index" type="checkbox" checked="Checked" @click="BoxChecked(index)" :value="index"
                            :style="{ accentColor: dataset.borderColor }">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
