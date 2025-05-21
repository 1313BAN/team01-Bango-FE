<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Sido {
  code?: string;
  sidoName: string;
  gugunName?: string;
  dongName?: string;
}

const selectedSido = ref<string | null>(null); // 선택된 시도
const sidoList = ref<Sido[]>([]); // 시도 목로 (Selector에 보일 값)

// 시/도 목록 가져오기
const fetchSidoList = async () => {
  try {
    const response = await fetch("http://localhost:8080/dongcode/sido");
    if (!response.ok) {
      throw new Error("Failed to fetch sido list");
    }
    const data = await response.json();
    sidoList.value = data;
  } catch (error) {
    console.error(error);
  }
};

// Select 값 변경 핸들러
const handleSelectChange = (value: string) => {
  selectedSido.value = value;
  console.log("선택된 시/도:", value);
};

// 컴포넌트가 마운트되면 fetch 실행
onMounted(() => {
  fetchSidoList();
});
</script>

<template>
  <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="시/도를 선택하세요" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="sido in sidoList"
          :key="sido.sidoName"
          :value="sido.sidoName"
        >
          {{ sido.sidoName }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
