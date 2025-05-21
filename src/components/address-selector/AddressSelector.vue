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
  list: any[];
  selected: string | null;
  labelKey: string; // ex) sidoName, gugunName, dongName
  placeholder?: string;
  disabled?: boolean;
}>();

// emit
const emit = defineEmits<{
  (e: "select", value: string): void;
}>();

// 내부 선택 핸들러
const onSelect = (value: string) => {
  emit("select", value);
};
</script>

<template>
  <Select
    :disabled="disabled"
    :modelValue="selected ?? ''"
    @update:modelValue="onSelect"
  >
    <SelectTrigger class="w-[150px]">
      <SelectValue :placeholder="placeholder ?? '선택하세요'" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="item in list"
          :key="item[labelKey]"
          :value="item[labelKey]"
        >
          {{ item[labelKey] }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
