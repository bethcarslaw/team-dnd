<script setup lang="ts">
import { nextTick, ref, useTemplateRef, watch } from 'vue';
import Card from './Card.vue';
import VueButton from './Button.vue';

const employeeName = ref('');
const emit = defineEmits(['onCreateEmployee']);
const isCreating = ref(false);
const createInput = useTemplateRef('create-input');

const handleCreate = () => {
    if (!employeeName.value) {
        return;
    }
    emit('onCreateEmployee', employeeName.value);

    isCreating.value = false;
    employeeName.value = '';
};

watch(isCreating, async (newValue) => {
    if (newValue) {
        await nextTick();

        createInput.value?.focus();
    }
});
</script>

<template>
    <div class="create-employee">
        <Card v-if="isCreating">
            <input
                type="text"
                v-model="employeeName"
                placeholder="Employee Name"
                className="create-input"
                ref="create-input"
            />
            <div className="actions">
                <VueButton
                    @click="isCreating = false"
                    variant="ghost"
                    colorScheme="danger"
                >
                    Cancel
                </VueButton>
                <VueButton @click="handleCreate" :disabled="!employeeName">
                    Create
                </VueButton>
            </div>
        </Card>

        <button className="add-btn" @click="isCreating = true" v-else>
            <img src="/add.svg" draggable="false" />
        </button>
    </div>
</template>

<style scoped>
.create-employee {
    margin-top: 10px;
}

.add-btn {
    width: 50px;
    height: 50px;
    display: block;
    justify-content: center;
    margin: auto;
    overflow: hidden;
    padding: 0;
    border: 0;
    margin-top: 10px;
    cursor: pointer;
}

.add-btn img {
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.add-btn img:hover {
    filter: brightness(1.3);
}

.create-input {
    border: 0;
    height: 40px;
    padding: 0 10px;
    outline: 0;
    margin-bottom: 10px;
}
.create-input:focus {
    background: rgba(0, 0, 0, 0.05);
    outline: 0;
}

.actions {
    display: flex;
    justify-content: space-between;
}
</style>
