<script setup lang="ts"></script>

<template>
    <div className="wrapper">
        <slot></slot>
    </div>
</template>

<style scoped>
.wrapper {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}
</style>
