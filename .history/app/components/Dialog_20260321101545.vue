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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
</script>
<template>
  <Dialog>
    <form>
      <DialogTrigger as-child>
        <slot name="trigger">
          <Button variant="outline">Edit profile</Button>
        </slot>
      </DialogTrigger>
      <DialogContent class="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4">
          <div class="grid gap-3">
            <Label for="name-1">Name</Label>
            <Input id="name-1" name="name" default-value="Pedro Duarte" />
          </div>
          <div class="grid gap-3">
            <Input id="username-1" name="username" default-value="@peduarte" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline"> Cancel </Button>
          </DialogClose>
          <Button type="submit"> Save changes </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
</template>
<style lang="scss" scoped></style>
