<script setup lang="ts">
import { computed, ref } from 'vue';
import { type Employee } from './types';
import { createCSVFileDownload, readCsvFile } from './util';
import Topbar from './components/Topbar.vue';
import Wrapper from './components/Wrapper.vue';
import TeamColumns from './components/TeamColumns.vue';
import ActionBar from './components/ActionBar.vue';

const employees = ref<Employee[]>([]);
const teams = ref<string[]>([]);

const employeeMap = computed(() => {
    return new Map(
        employees.value.map((employee) => [employee.name, employee])
    );
});

const handleEmployeeUpload = async (e: Event) => {
    //@ts-expect-error annoying file input type assignments
    const fileData = await readCsvFile(e.target.files[0]);

    fileData.map((employee) =>
        handleCreateEmployee({
            name: employee,
        })
    );
};

const handleTeamUpload = async (e: Event) => {
    //@ts-expect-error annoying file input type assignments
    const fileData = await readCsvFile(e.target.files[0]);

    const newTeams = Array.from(
        new Set(
            fileData.map((item) => {
                const [team, name] = item.split(',');

                if (name && employees.value) {
                    const foundEmployee = doesEmployeeExist(name);
                    if (foundEmployee) {
                        const foundEmployeeIndex = employees.value.findIndex(
                            (employee) => employee.name === name
                        );
                        employees.value[foundEmployeeIndex].team = team;
                    }

                    if (!foundEmployee) {
                        // Requirements say to discard
                        // but we can easily create a new employee here if we wanna
                        // employees.value.push({
                        //     name,
                        //     team,
                        // });
                    }
                }

                return team;
            })
        )
    );

    teams.value = Array.from(new Set([...teams.value, ...newTeams]));
};

const handleTeamChange = (droppedEmployee: Employee) => {
    const { name, team } = droppedEmployee;

    const foundEmployee = doesEmployeeExist(name);

    if (foundEmployee) {
        const foundEmployeeIndex = employees.value.findIndex(
            (employee) => employee.name === name
        );

        const [employee] = employees.value.splice(foundEmployeeIndex, 1);

        employee.team = team;

        employees.value.push(employee);
    }
};

const handleCreateEmployee = (newEmployee: Employee) => {
    const { name, team } = newEmployee;

    const foundEmployee = doesEmployeeExist(name);

    if (foundEmployee) {
        console.log(`${foundEmployee.name} already exists`);
        return;
    }

    employees.value.push({
        name: name.toLowerCase(),
        team,
    });
};

const handleExportTeamMap = () => {
    const filteredEmployees = employees.value.filter(
        (employee) => employee.team
    );

    const csvRows = filteredEmployees.map(
        (employee) => `${employee.team},${employee.name}`
    );

    const csvContent = csvRows.join('\n');

    createCSVFileDownload(csvContent, 'team-mappings');
};

const handleExportEmployees = () => {
    const csvContent = employees.value
        .flatMap((employee) => employee.name)
        .join('\n');

    createCSVFileDownload(csvContent, 'current-employees');
};

const handleDeleteTeam = (removedTeam: string) => {
    teams.value = teams.value.filter((team) => team !== removedTeam);

    employees.value.forEach((employee) => {
        if (employee.team === removedTeam) {
            employee.team = '';
        }
    });
};

const handleCreateTeam = (newTeam: string) => {
    if (teams.value.includes(newTeam)) {
        console.log(`${newTeam} already exists`);
        return;
    }

    teams.value.push(newTeam.toLowerCase());
};

const doesEmployeeExist = (name: string) => employeeMap.value.get(name);
</script>

<template>
    <Topbar />

    <Wrapper>
        <ActionBar
            @onImportEmployees="handleEmployeeUpload"
            @onImportTeamMap="handleTeamUpload"
            @onCreateTeam="handleCreateTeam"
            @onExportTeamMap="handleExportTeamMap"
            @onExportEmployees="handleExportEmployees"
        />

        <TeamColumns
            :employees="employees"
            :teams="teams"
            @onTeamChange="handleTeamChange"
            @onCreateEmployee="handleCreateEmployee"
            @onDeleteTeam="handleDeleteTeam"
        />
    </Wrapper>
</template>

<style scoped></style>
