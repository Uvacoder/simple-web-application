<script>

import * as tf from '@tensorflow/tfjs';

import { sortBy } from 'lodash';

import Navigation from './../structure/Navigation.vue';
import Footer     from './../structure/Footer.vue';

const MODEL_URL = 'https://s3.eu-west-2.amazonaws.com/www.automixologist.com/automixologist-model-v1.1/model.json';
const INGREDIENT_URL = 'https://s3.eu-west-2.amazonaws.com/www.automixologist.com/automixologist-model-v1.1/ingredients-v1.1.json';
const INGREDIENT_ENTRY_URL = 'https://s3.eu-west-2.amazonaws.com/www.automixologist.com/automixologist-model-v1.1/ingredient_entries-v1.1.json';

export default {
    name: 'Home',
    data: function() {
        return {
            loading: true,
            model: null,
            isModelReady: false,
            ingredients: [],
            ingredientEntries: []
        };
    },
    watch: {
        loading: function(to) {
            if(!!to) {
                console.log('Loaded.');
            }
        }
    },
    created: function() {
        Promise.all([
            this.downloadModel(),
            this.downloadIngredients(),
            this.downloadIngredientEntries()
        ]).then(_ => {
            this.loading = true;
        });
        window.predict = this.predict;
    },
    methods: {
        predict: function(ingredient) {
            return new Promise((resolve,reject) => {
                let x = tf.zeros([1,this.ingredientEntries.length]);
                const ingredientIndex = this.ingredientEntries.indexOf(ingredient);
                const buffer = tf.buffer(x.shape, x.dtype, x.dataSync());
                buffer.set(1., 0, ingredientIndex);
                x = buffer.toTensor();
                const result = this.model.predict(x);
                result.array().then(a =>{
                    const output = a[0];
                    const results = output.map((o,i) => {
                        return {
                            ingredientEntry: this.ingredientEntries[i],
                            score: o
                        };
                    });
                    const sortedResults = sortBy(results,['score']).reverse();
                    console.log('sortedResults',sortedResults);
                    resolve(sortedResults[0]);
                });
            });
        },
        downloadIngredients: function() {
            return new Promise((resolve,reject) => {
                fetch(INGREDIENT_URL)
                    .then(response => response.json())
                    .then(data => {
                        this.ingredients = data;
                        console.log('ingredients',data);
                        resolve();
                    });
            });
        },
        downloadIngredientEntries: function() {
            return new Promise((resolve,reject) => {
                fetch(INGREDIENT_ENTRY_URL)
                    .then(response => response.json())
                    .then(data => {
                        this.ingredientEntries = data;
                        console.log('ingredientEntries',data);
                        resolve();
                    });
            });
        },
        downloadModel: function() {
            return new Promise((resolve,reject) => {
                tf.loadLayersModel(MODEL_URL).then(model => {
                    this.model = model;
                    console.log('model',model);
                    resolve();
                });
            });
        }
    },
    components: {
        Navigation,
        Footer
    },
}
</script>

<template>
    <div class="fill-screen">
        <Navigation />
        <div class="content">
            <p>Hello World!</p>
            <img src="/assets/img/e356491018e753afabecf9706b1eb591.png"/>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 120px;
    }
</style>