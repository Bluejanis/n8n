<script setup lang="ts">
import {
	showsFeatureMaturityBadges,
	type FeatureMaturityId,
} from '@n8n/frontend-constants/feature-maturity';
import { computed } from 'vue';

import N8nFeatureMaturityBadges from '../FeatureMaturityBadges/FeatureMaturityBadges.vue';
import {
	readFeatureMaturity,
	useEnterprisePlan,
} from '../FeatureMaturityBadges/featureMaturityState';
import N8nSettingsRow from '../N8nSettingsRow';
import N8nSwitch from '../N8nSwitch';
import N8nTooltip from '../N8nTooltip';

export interface SettingsEnableRowProps {
	/** Row title. The switch uses it as its accessible name. */
	title: string;
	/** Short description under the title. */
	description?: string;
	/**
	 * Feature id from `featureMaturity`. The row renders that feature's badges at the smaller size.
	 * The page title hides the same badges while this row is mounted.
	 */
	feature?: FeatureMaturityId;
	/** Disables the switch. */
	disabled?: boolean;
	/** Tooltip shown while the switch is disabled. */
	disabledTooltip?: string;
	/** Test id for the switch. */
	switchTestId?: string;
	/** Passed through to the row. The row default is 2 lines, and the hard maximum is 3. */
	maxDescriptionLines?: number;
}

defineOptions({ name: 'N8nSettingsEnableRow', inheritAttrs: false });

const props = withDefaults(defineProps<SettingsEnableRowProps>(), {
	description: undefined,
	feature: undefined,
	disabled: false,
	disabledTooltip: undefined,
	switchTestId: undefined,
	maxDescriptionLines: undefined,
});

const enabled = defineModel<boolean>({ default: false });
const enterprisePlan = useEnterprisePlan();
// Skip the trailing slot when nothing would render, so the title does not keep an empty gap.
const showBadges = computed(() =>
	props.feature
		? showsFeatureMaturityBadges(readFeatureMaturity(props.feature), enterprisePlan.value)
		: false,
);
</script>

<template>
	<N8nSettingsRow
		v-bind="$attrs"
		:title="title"
		:description="description"
		:max-description-lines="maxDescriptionLines"
	>
		<template v-if="showBadges" #titleTrailing>
			<N8nFeatureMaturityBadges :feature="feature" placement="enable" />
		</template>
		<template #action>
			<slot name="action">
				<N8nTooltip
					v-if="disabledTooltip"
					:content="disabledTooltip"
					:disabled="!disabled"
					placement="top"
				>
					<N8nSwitch
						v-model="enabled"
						:disabled="disabled"
						:aria-label="title"
						v-bind="switchTestId ? { 'data-test-id': switchTestId } : {}"
					/>
				</N8nTooltip>
				<N8nSwitch
					v-else
					v-model="enabled"
					:disabled="disabled"
					:aria-label="title"
					v-bind="switchTestId ? { 'data-test-id': switchTestId } : {}"
				/>
			</slot>
		</template>
	</N8nSettingsRow>
</template>
