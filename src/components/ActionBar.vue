<script setup lang="ts">
import Button from './Button.vue';
import FileInput from './FileInput.vue';
import CreateTeam from './CreateTeam.vue';

const emit = defineEmits([
    'onImportEmployees',
    'onImportTeamMap',
    'onCreateTeam',
    'onExportTeamMap',
    'onExportEmployees',
]);
</script>

<template>
    <div className="action-bar">
        <div>
            <FileInput
                name="employee-upload"
                @change="(event) => emit('onImportEmployees', event)"
                testId="employee-upload-input"
                >Import Employees</FileInput
            >
        </div>

        <div>
            <FileInput
                name="team-upload"
                @change="(event) => emit('onImportTeamMap', event)"
                testId="team-upload-input"
                >Import Team Map</FileInput
            >
        </div>

        <CreateTeam
            @onCreateTeam="(teamName) => emit('onCreateTeam', teamName)"
        />

        <div className="add-team">
            <Button @click="emit('onExportTeamMap')"> Export Team Map </Button>
        </div>

        <div className="add-team">
            <Button @click="emit('onExportEmployees')">Export Employees</Button>
        </div>
    </div>
</template>

<style scoped>
.action-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
}
</style>
