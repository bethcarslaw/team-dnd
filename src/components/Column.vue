<script setup lang="ts">
import { ref } from 'vue';
import { Employee } from '../types';
import Card from './Card.vue';
import Button from './Button.vue';

const props = defineProps<{ employees: Employee[]; team: string }>();
const emit = defineEmits(['onDrop', 'onDelete']);
const isActiveDropzone = ref(false);

const startDrag = (event: DragEvent, employee: Employee) => {
    if (!event.dataTransfer) {
        return;
    }
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('employeeName', employee.name);
};

const onDrop = (event: DragEvent) => {
    if (!event.dataTransfer) {
        return;
    }
    const employeeName = event.dataTransfer.getData('employeeName');

    isActiveDropzone.value = false;

    emit('onDrop', {
        name: employeeName,
        team: props.team === 'No Team' ? '' : props.team,
    });
};
</script>

<template>
    <div>
        <div
            :className="`column ${isActiveDropzone ? 'active' : ''}`"
            @drop.prevent="onDrop"
            @dragenter.prevent
            @dragover.prevent="isActiveDropzone = true"
            @dragleave.prevent="isActiveDropzone = false"
        >
            <div className="header">
                <h3>{{ team }}</h3>
                <Button
                    @click="emit('onDelete', team)"
                    variant="ghost"
                    colorScheme="danger"
                    v-if="team !== 'No Team'"
                    >❌</Button
                >
            </div>
            <div className="cards">
                <Card
                    className="card"
                    v-for="employee in employees"
                    :key="employee.name"
                    draggable="true"
                    @dragstart="startDrag($event, employee)"
                >
                    {{ employee.name }}
                </Card>
            </div>

            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.column {
    background: #e8ecee;
    border: 1px solid #bfc9cd;
    border-radius: 10px;
    padding: 10px;
}

.column:hover .header button {
    opacity: 1;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header button {
    opacity: 0;
}

.active {
    border: 3px solid #a414f7;
}

.cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

h3 {
    text-transform: capitalize;
    margin: 0;
}
</style>
