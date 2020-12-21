let slide = `

<GridLayout id="slideDone" row="0" rows="*, auto" cols="auto">
    <ScrollView id="summaryScrollView" row="0"  col="0" scrollBarIndicatorVisible="false">
      <GridLayout  rows="auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto, auto, auto, auto, auto, auto, auto, auto" cols="*,*" marginLeft="5" marginRight="5">
        <FlexboxLayout row="0" flexWrap="wrap" marginTop="4">
            <Label text="{{ vaccDoseShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="vaccDoseValue" text="{{ vaccDose }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ vaccDoseSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="1" flexWrap="wrap" marginTop="4">
        <Label text="{{ coronaTestDateShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
        <Label id="coronaTestDateValue" text="{{ coronaTestDate }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ vaccDoseSummaryCssClass }}" tap="{{ switchBack }}"/>
    </FlexboxLayout> 
          <FlexboxLayout row="2" flexWrap="wrap" marginTop="4">
            <Label text="{{ coronaTestResultShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="coronaTestResultValue" text="{{ coronaTestResult }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ vaccDoseSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="3" flexWrap="wrap" marginTop="4">
        <Label text="{{ coronaTreatmentShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
        <Label id="coronaTreatmentValue" text="{{ coronaTreatment }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ vaccDoseSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="4" flexWrap="wrap" marginTop="4">
            <Label text="{{ injectionPainShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="injectionPainValue" text="{{ injectionPain }}" fontSize="{{ mySizeSummary }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ injectionPainSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="5" flexWrap="wrap" marginTop="4">
            <Label text="{{ rednessShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="rednessValue" text="{{ redness }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ rednessSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="6" flexWrap="wrap" marginTop="4">
            <Label text="{{ swellingShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="swellingValue" text="{{ swelling }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ swellingSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="7" flexWrap="wrap" alignItems="center" marginTop="4">
            <Label text="{{ fatigueShort }}"  fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="fatigueValue" text="{{ fatigue }}"  textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ fatigueSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="8" flexWrap="wrap" marginTop="4">
            <Label text="{{ chillsShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label id="chillsValue" text="{{ chills }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ chillsSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="9" flexWrap="wrap" marginTop="4">
            <Label  text="{{ headacheShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label  id="headacheValue" text="{{ headache }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ headacheSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="10" flexWrap="wrap" marginTop="4">
            <Label  text="{{ musclePainShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label  id="musclePainValue" text="{{ musclePain }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ musclePainSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="11" flexWrap="wrap" marginTop="4">
            <Label  text="{{ jointPainShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left" />
            <Label  id="jointPainValue" text="{{ jointPain }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ jointPainSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="12" flexWrap="wrap" marginTop="4">
            <Label  text="{{ vomitingShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left"  />
            <Label  id="vomitingValue" text="{{ vomiting }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ vomitingSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="13" flexWrap="wrap" marginTop="4">
            <Label  text="{{ diarrheaShort }}" fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left"  />
            <Label  id="diarrheaValue" text="{{ diarrhea }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ diarrheaSummaryCssClass }}" tap="{{ switchBack }}" />
        </FlexboxLayout>
        <FlexboxLayout row="14" flexWrap="wrap" marginTop="4">
            <Label  text="{{ feverShort }}"  fontWeight="bold" textWrap="true" marginTop="0" class="summary-header text-left"  />
            <Label  id="feverValue" text="{{ fever }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ feverSummaryCssClass }}" tap="{{ switchBack }}" />
        </FlexboxLayout>
        <FlexboxLayout row="15" flexWrap="wrap" marginTop="4">
            <Label  text="{{ cardiacShort }}" verticalAlignment="top" fontWeight="bold" marginTop="0" textWrap="true" class="summary-header text-left" />
            <Label  id="cardiacValue" text="{{ cardiac }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ cardiacSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="16" flexWrap="wrap" marginTop="4">
            <Label  text="{{ lymphNodeShort }}" verticalAlignment="top" fontWeight="bold" marginTop="0" textWrap="true" class="summary-header text-left" />
            <Label  id="lymphNodeValue" text="{{ lymphNode }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ lymphNodeSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="17" flexWrap="wrap" marginTop="4">
            <Label  text="{{ antipyreticShort }}" verticalAlignment="top" fontWeight="bold" marginTop="0" textWrap="true" class="summary-header text-left" />
            <Label  id="antipyreticValue" text="{{ antipyretic }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryFlexWrapBefore }}" marginTop="0" class="{{ antipyreticSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
        <FlexboxLayout row="18" flexWrap="wrap" marginTop="4">
            <Label  text="{{ eventShort }}" verticalAlignment="top" fontWeight="bold" marginTop="0" textWrap="true" class="summary-header text-left" />
            <Label  id="eventValue" text="{{ event }}" textWrap="true" flexGrow="{{ summaryFlexGrow }}" flexWrapBefore="{{ summaryEventFlexWrapBefore }}" marginTop="0" class="{{ eventSummaryCssClass }}" tap="{{ switchBack }}"/>
        </FlexboxLayout>
    </GridLayout>  
    </ScrollView>
     <FlexboxLayout row="1" justifyContent="center" flexWrap="wrap" ios:paddingTop="6" margin="0">
       <Button order="2" flexGrow="{{ summaryFlexGrow }}" text="{{ saveButton }}" class="-btn btn-primary my-button-primary my-button-gradX:active" tap="{{ switchTab }}" margin="4" ios:marginBottom="0" />
    </FlexboxLayout>
    </GridLayout>

`;

module.exports = { slide };
