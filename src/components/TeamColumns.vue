<script setup lang="ts">
import { computed } from 'vue';
import { type Employee } from '../types';
import Column from './Column.vue';
import CreateEmployee from './CreateEmployee.vue';

const props = defineProps<{ teams: string[]; employees: Employee[] }>();
const emit = defineEmits(['onTeamChange', 'onCreateEmployee', 'onDeleteTeam']);

const employeesByTeam = computed(() => {
    const { teams, employees } = props;

    const teamMap: Record<string, Employee[]> = {};

    teams.forEach((team) => {
        teamMap[team] = [];
    });

    teamMap['No Team'] = [];

    employees.forEach((employee) => {
        const teamKey = employee.team || 'No Team';
        if (!teamMap[teamKey]) {
            teamMap[teamKey] = [];
        }
        teamMap[teamKey].push(employee);
    });

    return teamMap;
});
</script>

<template>
    <div class="teams">
        <Column
            v-for="team in teams"
            :key="team"
            :employees="employeesByTeam[team]"
            :team="team"
            @onDrop="(employee) => emit('onTeamChange', employee)"
            @onDelete="(team) => emit('onDeleteTeam', team)"
        >
            <CreateEmployee
                @onCreateEmployee="
                    (name) =>
                        emit('onCreateEmployee', {
                            name: name,
                            team,
                        })
                "
            />
        </Column>

        <Column
            v-if="employees.length > 0"
            :employees="employeesByTeam['No Team']"
            team="No Team"
            @onDrop="(employee) => emit('onTeamChange', employee)"
        />
    </div>
</template>

<style scoped>
.teams {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
}
</style>
