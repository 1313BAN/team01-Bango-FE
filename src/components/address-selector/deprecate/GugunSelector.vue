<script setup lang="ts">
import { ref, watch } from "vue";
import type { DongCode } from "@/types/DongCode";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// props
defineProps<{
  list: DongCode[];
  selected: string | null;
  disabled?: boolean;
}>();

// emit
const emit = defineEmits<{
  (e: "select", value: string | undefined | null): void;
}>();

// 내부 선택 핸들러
const onSelect = (value: string | undefined | null) => {
  if (value != null) emit("select", value);
};
</script>

<template>
  <Select
    :disabled="disabled"
    :modelValue="selected ?? ''"
    @update:modelValue="onSelect"
  >
  <SelectTrigger class="w-[150px]">
    <SelectValue placeholder="구/군 선택" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="item in list"
          :key="item.gugunName"
          :value="item.gugunName"
        >
          {{ item.gugunName }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
