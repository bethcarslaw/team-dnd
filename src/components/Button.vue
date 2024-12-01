<script setup lang="ts">
defineProps<{
    variant?: 'ghost';
    disabled?: boolean;
    colorScheme?: 'danger';
}>();

const emit = defineEmits(['click']);

const variantClasses = new Map([['ghost', 'ghost']]);
const colorSchemeClasses = new Map([['danger', 'danger']]);
</script>

<template>
    <button
        :class="`button ${colorSchemeClasses.get(
            colorScheme || ''
        )} ${variantClasses.get(variant || '')}`"
        @click="emit('click')"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>

<style scoped>
.button {
    background: #a414f7;
    color: white;
    outline: 0;
    border: 0;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 4px;
}

.button:hover {
    background: #b230fd;
}

.danger {
    background: rgb(172, 78, 78);
    color: white;
}

.button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.ghost {
    background: transparent;
    padding: 10px 0;
    color: #a414f7;
}

.ghost:hover {
    background: transparent;
    color: #b230fd;
}

.ghost.danger {
    color: rgb(172, 78, 78);
}

.ghost.danger:hover {
    color: rgb(117, 12, 12);
}
</style>
