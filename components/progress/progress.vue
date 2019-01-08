<template>
	<view>
		<progress v-show="pageShow"  :percent="percent" stroke-width="2"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prop:['pageShow','percent']
			};
		},
		mounted() {
		},
		methods:{
		}
	}
</script>

<style>

</style>
