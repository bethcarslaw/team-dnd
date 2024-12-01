<script setup lang="ts">
import { useTemplateRef } from 'vue';

defineProps<{ name: string; testId: string }>();
const emit = defineEmits(['change']);
const inputRef = useTemplateRef('file-input');

const handleChangeEvent = (event: Event) => {
    emit('change', event);

    if (inputRef.value) {
        // reset the input after emitting the file event so you can
        // reupload the same file again
        inputRef.value.files = null;
        inputRef.value.value = '';
    }
};
</script>

<template>
    <label className="file-input" :for="name">
        <slot></slot>
        <input
            :name="name"
            type="file"
            @change="handleChangeEvent"
            accept=".csv"
            :id="name"
            :data-testid="testId"
            ref="file-input"
        />
    </label>
</template>

<style scoped>
.file-input {
    background: #a414f7;
    color: white;
    outline: 0;
    border: 0;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 4px;
}

.file-input:hover {
    background: #b230fd;
}

.file-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

input[type='file'] {
    display: none;
}
</style>
