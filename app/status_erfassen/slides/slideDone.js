let slide = `

<GridLayout id="slideDone" row="0" rows="*, auto" cols="auto">
    <ScrollView id="summaryScrollView" row="0"  col="0" scrollBarIndicatorVisible="false">
      <GridLayout  rows="auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto, auto, auto, auto, auto, auto" cols="*,*" marginLeft="5" marginRight="5">
        <FlexboxLayout row="0" flexWrap="wrap" marginTop="4">
            <Label text="{{ vaccDoseShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="vaccDoseValue" text="{{ vaccDose }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ vaccDoseSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="1" flexWrap="wrap" marginTop="4">
            <Label text="{{ injectionPainShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="injectionPainValue" text="{{ injectionPain }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ injectionPainSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="2" flexWrap="wrap" marginTop="4">
            <Label text="{{ rednessShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="rednessValue" text="{{ redness }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ rednessSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="3" flexWrap="wrap" marginTop="4">
            <Label text="{{ swellingShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="swellingValue" text="{{ swelling }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ swellingSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="4" flexWrap="wrap" alignItems="center" marginTop="4">
            <Label text="{{ fatigueShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="fatigueValue" text="{{ fatigue }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ fatigueSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="5" flexWrap="wrap" marginTop="4">
            <Label text="{{ chillsShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="chillsValue" text="{{ chills }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ chillsSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="6" flexWrap="wrap" marginTop="4">
            <Label  text="{{ headacheShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label  id="headacheValue" text="{{ headache }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ headacheSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="7" flexWrap="wrap" marginTop="4">
            <Label  text="{{ musclePainShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label  id="musclePainValue" text="{{ musclePain }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ musclePainSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="8" flexWrap="wrap" marginTop="4">
            <Label  text="{{ jointPainShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label  id="jointPainValue" text="{{ jointPain }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ jointPainSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="9" flexWrap="wrap" marginTop="4">
            <Label  text="{{ vomitingShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left"  />
            <Label  id="vomitingValue" text="{{ vomiting }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ vomitingSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="10" flexWrap="wrap" marginTop="4">
            <Label  text="{{ diarrheaShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left"  />
            <Label  id="diarrheaValue" text="{{ diarrhea }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ diarrheaSummaryCssClass }}" tap="{{ switchBack }}" />
        </FlexboxLayout>
        <FlexboxLayout row="11" flexWrap="wrap" marginTop="4">
            <Label  text="{{ feverShort }}" fontSize="{{ mySizeSummary }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left"  />
            <Label  id="feverValue" text="{{ fever }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ feverSummaryCssClass }}" tap="{{ switchBack }}" />
        </FlexboxLayout>
        <FlexboxLayout row="12" flexWrap="wrap" marginTop="4">
            <Label  text="{{ cardiacShort }}" fontSize="{{ mySizeSummary }}" verticalAlignment="top" fontWeight="bold" marginTop="0" textWrap="true" class="summary-header text-left" />
            <Label  id="cardiacValue" text="{{ cardiac }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ cardiacSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="13" flexWrap="wrap" marginTop="4">
            <Label  text="{{ lymphNodeShort }}" fontSize="{{ mySizeSummary }}" verticalAlignment="top" fontWeight="bold" marginTop="0" textWrap="true" class="summary-header text-left" />
            <Label  id="lymphNodeValue" text="{{ lymphNode }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ lymphNodeSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="14" flexWrap="wrap" marginTop="4">
            <Label  text="{{ antipyreticShort }}" fontSize="{{ mySizeSummary }}" verticalAlignment="top" fontWeight="bold" marginTop="0" textWrap="true" class="summary-header text-left" />
            <Label  id="antipyreticValue" text="{{ antipyretic }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ antipyreticSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="15" flexWrap="wrap" marginTop="4">
            <Label  text="{{ eventShort }}" fontSize="{{ mySizeSummary }}" verticalAlignment="top" fontWeight="bold" marginTop="0" textWrap="true" class="summary-header text-left" />
            <Label  id="eventValue" text="{{ event }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryEventFlexWrapBefore }}" marginTop="0" class="{{ eventSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
    </GridLayout>  
    </ScrollView>
     <FlexboxLayout row="1" justifyContent="center" flexWrap="wrap" ios:paddingTop="6" margin="0">
       <Button order="1" flexGrow="{{ summaryFlexGrow }}" text="{{ changeButtonCurrent }}" fontSize="{{ mySizePrimaryButton }}" class="-btn btn-primary my-button-primary my-button-gradX:active" tap="{{ activateSwitchBack }}" margin="4" ios:marginBottom="0" />
       <Button order="2" flexGrow="{{ summaryFlexGrow }}" text="{{ saveButton }}" fontSize="{{ mySizePrimaryButton }}" class="-btn btn-primary my-button-primary my-button-gradX:active" tap="{{ switchTab }}" margin="4" ios:marginBottom="0" />
    </FlexboxLayout>
    </GridLayout>

`;

module.exports = { slide };
