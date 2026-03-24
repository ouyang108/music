<script setup lang="ts">
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const open = defineModel<boolean>({
  default: false,
});
const emits = defineEmits<{
  (e: "save"): void;
}>();
const save = () => {
  emits("save");
};
</script>
<template>
  <UiDialog v-model:open="open">
    <form>
      <UiDialogTrigger as-child>
        <slot name="trigger"> </slot>
      </UiDialogTrigger>
      <UiDialogContent class="sm:max-w-106.25">
        <UiDialogHeader>
          <UiDialogTitle><slot name="title"> </slot></UiDialogTitle>
          <UiDialogDescription>
            <slot name="description"> </slot>
          </UiDialogDescription>
        </UiDialogHeader>
        <slot name="content"> </slot>
        <UiDialogFooter>
          <UiDialogClose as-child>
            <UiButton variant="outline" class="cursor-pointer"> 取消 </UiButton>
          </UiDialogClose>
          <UiButton type="submit" class="cursor-pointer" @click="save">
            保存
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </form>
  </UiDialog>
</template>
<style lang="scss" scoped></style>
