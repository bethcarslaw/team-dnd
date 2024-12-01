<script setup lang="ts"></script>

<template>
    <div className="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
    background: white;
    padding: 10px;
    border-radius: 10px;
    text-transform: capitalize;
    cursor: grab;
    min-height: 50px;
    font-weight: bold;
}
</style>
