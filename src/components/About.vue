<script setup>
import AboutPageTitle from './Title.vue'
</script>

<template>
    <div class="CenterText">
        <AboutPageTitle class="BiggerFont" text="About"></AboutPageTitle>
        <p class="BiggerFont"><router-link to="/">Home</router-link></p>
        <div class="SideMargin">
            <p class="TopMargin BiggerFont">This website was made as an assignment in a class at IT-högskolan about Vue.
                The data is
                fetched from the website <strong>API Ninjas</strong> from the following adress: <a
                    href="https://api-ninjas.com/api/covid19">https://api-ninjas.com/api/covid19</a>. The data was then
                crossreferenced with data from the following websites:</p>
            <p class="TopMargin">
            <h4 class="BiggerFont">Our World in Data</h4><a class=" TopMargin"
                href="https://ourworldindata.org/coronavirus/country/china">https://ourworldindata.org/coronavirus/country/china</a>
            </p>
            <p class="TopMargin ">
                <a class="TopMargin"
                    href="https://ourworldindata.org/coronavirus/country/sweden">https://ourworldindata.org/coronavirus/country/sweden</a>
            </p>
            <p class="TopMargin">
            <h4 class="BiggerFont">Wikipedia</h4><a class=" TopMargin"
                href="https://en.wikipedia.org/wiki/COVID-19_pandemic_in_Sweden">https://en.wikipedia.org/wiki/COVID-19_pandemic_in_Sweden</a>
            </p>
            <p class="TopMargin BiggerFont"> The mentioned websites had wide differences in their statistics.
                <strong>Our World in
                    Data</strong> had the maximum level of cases in China at about 5 million; In Sweden the maximum
                level of
                cases was 40 000. According to <strong>Wikipedia</strong> the maximum level of cases in Sweden was about
                2.7
                million. The data from <strong>API Ninjas</strong> matches the data from the first source about China (5
                million cases), but the second source about Sweden (2.7 million cases). It is also unclear from where
                the
                data at <strong>API Ninjas</strong> was sourced. </p>
            <p class="TopMargin BiggerFont">Conclusion is to take the statistics on this website with a grain of salt.
            </p>
        </div>
        <p class="TopMargin BiggerFont"><router-link to="/">Home</router-link></p>
    </div>
</template>
