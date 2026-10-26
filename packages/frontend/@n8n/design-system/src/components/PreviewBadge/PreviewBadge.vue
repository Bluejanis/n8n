<script lang="ts" setup>
import { useI18n } from '../../composables/useI18n';
import N8nBadge from '../N8nBadge';
import type { BadgeSize } from '../N8nBadge/Badge.type';
import N8nTooltip from '../N8nTooltip';

defineOptions({ name: 'N8nPreviewBadge' });

withDefaults(
	defineProps<{
		/** The badge size. */
		size?: BadgeSize;
		/** Label override. Defaults to "Preview". */
		text?: string;
		/** Feature documentation page. The tooltip links here. */
		docsUrl?: string;
	}>(),
	{ size: 'xxsmall', text: undefined, docsUrl: undefined },
);

const { t } = useI18n();
</script>

<template>
	<N8nTooltip placement="top" as-child>
		<N8nBadge variant="outline" :size="size" :class="$style.badge" tabindex="0">
			{{ text ?? t('previewBadge.preview') }}
		</N8nBadge>
		<template #content>
			<span>{{ t('previewBadge.tooltip') }}</span>
			<a
				v-if="docsUrl"
				:class="$style.docsLink"
				:href="docsUrl"
				target="_blank"
				rel="noopener noreferrer"
			>
				{{ t('maturityBadge.docsLink') }}
			</a>
		</template>
	</N8nTooltip>
</template>

<style lang="scss" module>
@use '../../css/mixins/focus';

.badge:global(.n8n-badge) {
	cursor: default;
	outline: none;
	/* Wins over the outline variant so Preview stays pink on light and dark surfaces. */
	--n8n-badge--background: transparent;
	--n8n-badge--border-color: var(--color--pink-500);
	--n8n-badge--text-color: var(--color--pink-500);

	&:focus-visible {
		@include focus.focus-ring-with-border;
	}
}

.docsLink {
	color: inherit;
	text-decoration: underline;
}
</style>
