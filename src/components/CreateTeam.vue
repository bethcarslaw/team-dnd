<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
const emit = defineEmits(['onCreateTeam']);

const teamName = ref('');

const handleCreateTeam = () => {
    if (!teamName) {
        return;
    }

    emit('onCreateTeam', teamName.value);

    teamName.value = '';
};
</script>

<template>
    <div className="add-team">
        <input v-model="teamName" placeholder="Team Name" />
        <Button @click="handleCreateTeam" :disabled="!teamName">
            Create Team
        </Button>
    </div>
</template>

<style scoped>
.add-team input {
    height: 35px;
    padding: 0 10px;
    background: rgba(0, 0, 0, 0.1);
    outline: 0;
    border: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.add-team input + button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>
