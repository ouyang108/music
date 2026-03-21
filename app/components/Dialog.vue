<script setup lang="ts">
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const emits = defineEmits<{
  (e: "save"): void;
}>();
const save = () => {
  emits("save");
};
</script>
<template>
  <Dialog>
    <form>
      <DialogTrigger as-child>
        <slot name="trigger"> </slot>
      </DialogTrigger>
      <DialogContent class="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle><slot name="title"> </slot></DialogTitle>
          <DialogDescription>
            <slot name="description"> </slot>
          </DialogDescription>
        </DialogHeader>
        <slot name="content"> </slot>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline" class="cursor-pointer"> 取消 </Button>
          </DialogClose>
          <Button type="submit" class="cursor-pointer" @click="save">
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
</template>
<style lang="scss" scoped></style>
