<script setup lang="ts">
import { computed } from 'vue';

import type { BadgeSize } from '../N8nBadge/Badge.type';
import N8nEnterpriseReadinessBadge from '../EnterpriseReadinessBadge/EnterpriseReadinessBadge.vue';
import N8nPreviewBadge from '../PreviewBadge/PreviewBadge.vue';

defineOptions({ name: 'N8nFeatureMaturityBadges' });

const props = withDefaults(
	defineProps<{
		/** Show the Preview badge. */
		preview: boolean;
		/** The feature lacks full enterprise support. */
		limitedEnterpriseSupport: boolean;
		/** Documentation page for the enterprise badge tooltip. */
		docsUrl?: string;
		/** The instance is on an enterprise plan. */
		enterprisePlan: boolean;
		/** Badge size. Use `xxsmall` on a row and `xsmall` on a page title. */
		size?: BadgeSize;
		/**
		 * Prefix for the badge test ids.
		 * Produces `${testId}-preview-badge` and `${testId}-enterprise-readiness-badge`.
		 */
		testId?: string;
	}>(),
	{
		docsUrl: undefined,
		size: 'xxsmall',
		testId: undefined,
	},
);

const showEnterpriseBadge = computed(() => props.limitedEnterpriseSupport && props.enterprisePlan);
const visible = computed(() => props.preview || showEnterpriseBadge.value);
const previewTestId = computed(() => (props.testId ? `${props.testId}-preview-badge` : undefined));
const enterpriseTestId = computed(() =>
	props.testId ? `${props.testId}-enterprise-readiness-badge` : undefined,
);
</script>

<template>
	<span v-if="visible" :class="$style.badges">
		<N8nPreviewBadge
			v-if="preview"
			:size="size"
			v-bind="previewTestId ? { 'data-test-id': previewTestId } : {}"
		/>
		<N8nEnterpriseReadinessBadge
			v-if="showEnterpriseBadge"
			:size="size"
			:docs-url="docsUrl"
			v-bind="enterpriseTestId ? { 'data-test-id': enterpriseTestId } : {}"
		/>
	</span>
</template>

<style lang="scss" module>
.badges {
	display: inline-flex;
	align-items: center;
	gap: var(--spacing--4xs);
}
</style>
