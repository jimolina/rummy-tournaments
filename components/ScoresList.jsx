"use client";

import { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import {getAvatar} from "@utils/getAvatar.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWineGlass,
  faHeartCrack,
  faTrophy,
  faTruckMedical,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

const ScoreCard = ({ post, groupDate, handleTagClick }) => {
  let loopTr = 0;
  const [ getWinner, setGetWinner ] = useState( false );
  const [ seeColumns, setSeeColumns ] = useState( true );
  const [ seeActionColumns, setSeeActionColumns ] = useState( 'see' );
  const [ seeIconColumns, setSeeIconColumns ] = useState( 'faEye' );

  const date = post.date ? new Date(post.date).toDateString() : '';
  const scoresByGame = {
    score: [],
  };

  // Splite the Score by numbers of player to be displayed
  // on each TR or the table.
  const chunkSize = post.players_name.length;
  for ( let i = 0; i < post.players_scores.length; i += chunkSize ) {
      const chunk = post.players_scores.slice( i, i + chunkSize );
      scoresByGame.score.push( chunk );
  }

  // Calculate totals by game by player to be displayed
  // on each TD of rows 'sub-totals'.
  const calculateGameTotals = ( tableId, column, row ) => {
    const table = document.getElementById( tableId );
    let sumVal = 0;

    if ( table ) {
      const rowToStart = 3 <= row ? 1 : row - 2;
      for ( let i = rowToStart; i < 5; i++ ) {
        if ( table.rows[ i ].cells[ column ] ) {
          sumVal = sumVal + parseInt( table.rows[ i ].cells[ column ].innerHTML );
        }
      }
    }

    return sumVal;
  }

  // This calculate the big totals by player just using
  // the values on each TR 'sub-totals'.
  const calculateTotals = ( tableId, column ) => {
    const table = document.getElementById( tableId );
    let sumVal = 0;

    if ( table ) {
      const tableRows = table.querySelectorAll("tr.sub-totals");

      for ( let i = 0; i < tableRows.length; i++ ) {
        if ( tableRows[ i ].cells[ column ] ) {
          sumVal = sumVal + parseInt( tableRows[ i ].cells[ column ].querySelector("span").innerHTML );
        }
      }
    }

    return sumVal;
  }

  // This contain the logic to show/hide the copy/icon
  // for the CTA 'see game column'.
  useEffect(() => {
    const table = document.getElementById( 'scoresTable' );

    if ( table ){
      if ( seeColumns ) {
        setSeeActionColumns( 'hide' );
        setSeeIconColumns( 'faEyeSlash' );
        table.classList.add( 'see-all' );
      } else {
        setSeeActionColumns( 'see' );
        setSeeIconColumns( 'faEye' );
        table.classList.remove( 'see-all' );
      }
    }
  }, [ seeColumns ]);

  // This contain the logic to calculate and show the big totals
  // and the Winner and Loser.
  useEffect(() => {
    const getGameWinner = ( tableId ) => {
      const table = document.getElementById( tableId );
    
      if ( table ){
        const tableRows = table.querySelectorAll("tr.sub-totals");
    
        for ( let i = 0; i < tableRows.length; i++ ) {
          let scoreByRow = [];
    
          if ( tableRows ) {
            const tableCellsByRow = tableRows[ i ].querySelectorAll("td");
    
            // Get all subtotals by game.
            for ( let x = 0; x < tableCellsByRow.length; x++ ) {
              if ( tableCellsByRow ) {
                const score = tableCellsByRow[ x ].querySelector("span").innerHTML;
                scoreByRow.push( score );
              }
            }
    
            // Set Winner and Loser on each game.
            if ( 0 < scoreByRow.length ) {
              const maxValue = parseInt( Math.max.apply(null, scoreByRow) );
              const minValue = parseInt( Math.min.apply(null, scoreByRow) );

              for ( let x = 0; x < tableCellsByRow.length; x++ ) {
                if ( parseInt( tableCellsByRow[ x ].querySelector("span").innerHTML ) === minValue ) {
                  tableCellsByRow[ x ].className = "winner";
                } else if ( parseInt( tableCellsByRow[ x ].querySelector("span").innerHTML ) === maxValue ) {
                  tableCellsByRow[ x ].className = "loser";
                }
              }
            }
          }
        }

        // Set Winner and Loser of entire games just looking the numbers
        // on the TR 'totals'.
        const tableTotalsRow = table.querySelector("tr.totals");

        if ( tableTotalsRow ) {
          let scoreTotalsByCell = [];
          const tableTotalsCells = tableTotalsRow.querySelectorAll("td");

          for ( let x = 0; x < tableTotalsCells.length; x++ ) {
            if ( tableTotalsCells ) {
              const scoreTotal = tableTotalsCells[ x ].querySelector("span").innerHTML;
              scoreTotalsByCell.push( scoreTotal );
            }
          }

          if ( 0 < scoreTotalsByCell.length ) {
            const maxValue = parseInt( Math.max.apply(null, scoreTotalsByCell) );
            const minValue = parseInt( Math.min.apply(null, scoreTotalsByCell) );

            for ( let x = 0; x < tableTotalsCells.length; x++ ) {
              if ( parseInt( tableTotalsCells[ x ].querySelector("span").innerHTML ) === minValue ) {
                tableTotalsCells[ x ].className = "winner";
              } else if ( parseInt( tableTotalsCells[ x ].querySelector("span").innerHTML ) === maxValue ) {
                tableTotalsCells[ x ].className = "loser";
              }
            }
          }
        }

        table.querySelector("tr.totals").className += " final";
      }
    }
  
    if ( getWinner ) {
      getGameWinner( 'scoresTable' );
    }
  }, [ getWinner ]);

  return (
    <>
      {post.tournament ? (
        <li>
          <div className="flex justify-between w-full mb-3">
            {/* Mobile Header */}
            <div className="md:hidden flex flex-col w-full gap-2">
              <h5>{ date }</h5>
              <button
                type="button"
                onClick={ () => setGetWinner( true ) }
                disabled={ 3 > scoresByGame.score.length ?? true }
                className='btn orange_btn'>
                  Find Winner!
              </button>
              <button
                type="button"
                onClick={ () => setSeeColumns( seeColumns => ! seeColumns ) }
                disabled={ 3 > scoresByGame.score.length ?? true }
                className='see-all-columns'>
                  { 'faEye' === seeIconColumns
                    ? <FontAwesomeIcon icon={faEye} className="fa-sm pr-1" />
                    : <FontAwesomeIcon icon={faEyeSlash} className="fa-sm pr-1" />
                  }
                  
                  {seeActionColumns} game columns
              </button>
            </div>
            {/* Desktop Header */}
            <div className="max-md:hidden w-full flex justify-between">
              <div>
                <h5>{ date }</h5>
                <button
                  type="button"
                  onClick={ () => setSeeColumns( seeColumns => ! seeColumns ) }
                  disabled={ 3 > scoresByGame.score.length ?? true }
                  className='see-all-columns'>
                    { 'faEye' === seeIconColumns
                      ? <FontAwesomeIcon icon={faEye} className="fa-sm pr-1" />
                      : <FontAwesomeIcon icon={faEyeSlash} className="fa-sm pr-1" />
                    }
                    
                    {seeActionColumns} game columns
                </button>
              </div>
              <button
                type="button"
                onClick={ () => setGetWinner( true ) }
                disabled={ 3 > scoresByGame.score.length ?? true }
                className='btn orange_btn'>
                  Find Winner!
              </button>
            </div>            
          </div>
          {/* <h3 className="font-satoshi font-semibold text-gray-900">
            {post.tournament}
          </h3>
          <p className="font-inter text-xs text-gray-400">
            {date}
          </p> */}
          <div className="table_container">
            <table id="scoresTable" className="table_responsive">
              <thead className="bg-slate-50">
                <tr>
                  {post.players_name.map( ( player, index ) => {
                    return (
                      <th key={`player_score_${index}`}>
                        {/* {player} */}
                        <Image
                          src={ getAvatar( post.players_email[index] ) }
                          alt={player}
                          width={50}
                          height={50}
                          className="avatar rounded-full object-contain"
                        />
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody >
                {scoresByGame.score.map( ( scoresRow, index ) => {
                  loopTr ++;

                  return (
                    <Fragment key={`scores_row_${index}`}>
                      <tr>
                        {scoresRow.map( ( score, loopRow ) => {
                          return (
                            <td key={`score_${loopRow}`}>
                              {score}
                            </td>
                          )
                        })}
                      </tr>
                      {4 === loopTr ?
                        (
                          <tr key={`scores_sub_totals_${index}`} className="sub-totals">
                            {scoresByGame.score[0].map( ( column, loopColumn ) =>
                              {
                                loopTr=0;
                                return (
                                  <td key={`sub_total_column_${loopColumn}`}>
                                    <FontAwesomeIcon icon={faWineGlass} className="fa-xl" transform="left-2" />
                                    <FontAwesomeIcon icon={faHeartCrack} className="fa-xl" transform="left-2" />
                                    {` `}
                                    <span>
                                      {calculateGameTotals( 'scoresTable', loopColumn, index )}
                                    </span>
                                  </td>
                                )
                              })
                            }
                          </tr>
                        ): ( null )
                      }
                      {( scoresByGame.score.length - 1 ) === index ?
                        (
                          <tr key={`scores_totals_${index}`} className="totals hidden">
                            {scoresByGame.score[0].map( ( column, loopTotal ) =>
                              {
                                return (
                                  <td key={`total_column_${loopTotal}`}>
                                    <FontAwesomeIcon icon={faTrophy} className="fa-xl" transform="left-2" bounce />
                                    <FontAwesomeIcon icon={faTruckMedical} className="fa-xl" transform="left-2" beat />
                                    {` `}
                                    <span>
                                      {calculateTotals( 'scoresTable', loopTotal )}
                                    </span>
                                  </td>
                                )
                              })
                            }
                          </tr>
                        ): ( null )
                      }
                    </Fragment>
                  )
                })}

              </tbody>
            </table>
          </div>
        </li>
      ): ( null )}
    </>
  )
}

export default ScoreCard;