<template>
  <div>
     <keep-alive>
        <router-view :key="$route.fullPath" v-if="$route.meta.$keepAlive"/>
      </keep-alive>
      <router-view :key="$route.fullPath" v-if="!$route.meta.$keepAlive"/>
  </div>
</template>
