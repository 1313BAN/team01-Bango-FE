<script setup lang="ts">
import type { DongCode } from "@/types/type";
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
  (e: "select", value: any): void;
}>();

// 내부 선택 핸들러
const onSelect = (value: any) => {
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
      <SelectValue placeholder="동 선택" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="item in list"
          :key="item.dongName"
          :value="item.dongName"
        >
          {{ item.dongName }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
