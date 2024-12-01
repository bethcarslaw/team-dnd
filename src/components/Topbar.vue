<script setup lang="ts">
import Wrapper from './Wrapper.vue';
</script>

<template>
    <div className="topbar">
        <Wrapper>
            <img src="/logo.svg" alt="Kaleidoscope" />
        </Wrapper>
    </div>
</template>

<style scoped>
.topbar {
    display: flex;
    justify-content: center;
    padding: 10px;
    background: #a414f7;
    height: 40px;
}

.topbar img {
    width: auto;
    height: 100%;
}
</style>
