<script setup lang="ts">
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
  list: string[];
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
    <SelectTrigger class="w-36">
      <SelectValue placeholder="구/군 선택" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="gugunName in list"
          :key="gugunName"
          :value="gugunName"
        >
          {{ gugunName }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
